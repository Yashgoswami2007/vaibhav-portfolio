import os
from PIL import Image

def compress_images(directory, reduction_ratio=0.8, target_width=None):
    """
    Compresses all images in the given directory and converts them to WebP.
    - Path: The directory where frames are located.
    - reduction_ratio: 0.8 corresponds to a 20% reduction in quality.
    - target_width: If set, resizes the image to this width, maintaining aspect ratio.
    """
    supported_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    
    if not os.path.exists(directory):
        print(f"Error: Directory '{directory}' not found.")
        return

    # Create an 'optimized' folder to differentiate from 'compressed'
    output_dir = os.path.join(directory, 'optimized_webp')
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Starting WebP optimization in: {directory}")
    print(f"Output will be in: {output_dir}")

    files = sorted([f for f in os.listdir(directory) if f.lower().endswith(supported_extensions)])
    total_files = len(files)

    for i, filename in enumerate(files):
        file_path = os.path.join(directory, filename)
        # Always output as .webp
        name_without_ext = os.path.splitext(filename)[0]
        output_path = os.path.join(output_dir, f"{name_without_ext}.webp")
        
        try:
            with Image.open(file_path) as img:
                # Resize if target_width is provided
                if target_width and img.width > target_width:
                    aspect_ratio = img.height / img.width
                    new_height = int(target_width * aspect_ratio)
                    img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)

                # Save as WEBP
                img.save(output_path, "WEBP", quality=int(100 * reduction_ratio), method=6)
                
                original_size = os.path.getsize(file_path)
                new_size = os.path.getsize(output_path)
                savings = (original_size - new_size) / original_size * 100
                print(f"[{i+1}/{total_files}] Optimized {filename} -> {os.path.basename(output_path)}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({savings:.1f}% reduction)")
        
        except Exception as e:
            print(f"Failed to optimize {filename}: {e}")

if __name__ == "__main__":
    # Adjust path to your assets/frames folder
    target_folder = r"src/assets/frames"
    if not os.path.isabs(target_folder):
        base_path = os.path.dirname(os.path.abspath(__file__))
        target_folder = os.path.join(base_path, "src", "assets", "frames")
    
    # We'll use 80% quality and potentially downscale to 1920 or 1280 if needed.
    # For now, let's keep original resolution but switch to WebP.
    compress_images(target_folder, target_width=1280) # Downscaling to 720p (ish) width
    print("\nDone! Check the 'optimized_webp' folder.")

