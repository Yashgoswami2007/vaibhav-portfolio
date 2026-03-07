import os
from PIL import Image

def compress_images(directory, reduction_ratio=0.8):
    """
    Compresses all images in the given directory.
    - Path: The directory where frames are located.
    - reduction_ratio: 0.8 corresponds to a 20% reduction in quality/optimization.
    """
    supported_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    
    if not os.path.exists(directory):
        print(f"Error: Directory '{directory}' not found.")
        return

    # Create a 'compressed' folder to avoid overwriting originals immediately
    output_dir = os.path.join(directory, 'compressed')
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Starting compression in: {directory}")
    print(f"Output will be in: {output_dir}")

    for filename in os.listdir(directory):
        if filename.lower().endswith(supported_extensions):
            file_path = os.path.join(directory, filename)
            output_path = os.path.join(output_dir, filename)
            
            try:
                with Image.open(file_path) as img:
                    # For PNGs, we use optimization and a slight color reduction if possible
                    # For JPEGs, we set quality to 80 (20% reduction)
                    if filename.lower().endswith(('.jpg', '.jpeg')):
                        img.save(output_path, "JPEG", quality=int(100 * reduction_ratio), optimize=True)
                    elif filename.lower().endswith('.png'):
                        # PNG is lossless, so we use 'optimize' and compress_level
                        img.save(output_path, "PNG", optimize=True, compress_level=9)
                    elif filename.lower().endswith('.webp'):
                        img.save(output_path, "WEBP", quality=int(100 * reduction_ratio), method=6)
                    
                    original_size = os.path.getsize(file_path)
                    new_size = os.path.getsize(output_path)
                    savings = (original_size - new_size) / original_size * 100
                    print(f"Compressed {filename}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({savings:.1f}% reduced)")
            
            except Exception as e:
                print(f"Failed to compress {filename}: {e}")

if __name__ == "__main__":
    # Adjust path to your assets/frames folder
    target_folder = r"src/assets/frames"
    if not os.path.isabs(target_folder):
        # Resolve relative to the script's location (assuming root)
        base_path = os.path.dirname(os.path.abspath(__file__))
        target_folder = os.path.join(base_path, "src", "assets", "frames")
    
    compress_images(target_folder)
    print("\nDone! Check the 'compressed' folder inside your frames directory.")
