import cv2
import numpy as np
from pathlib import Path


class ImageAnalysisService:

    @staticmethod
    def preprocess_image(image_path: str):

        image = cv2.imread(image_path)

        if image is None:
            raise ValueError("Unable to read image.")

        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Remove noise
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)

        # Improve contrast
        processed = cv2.equalizeHist(blurred)

        processed_dir = Path("uploads/processed")
        processed_dir.mkdir(parents=True, exist_ok=True)

        output_path = processed_dir / (
            Path(image_path).stem + "_processed.png"
        )

        cv2.imwrite(str(output_path), processed)

        return {
            "original": image_path,
            "processed": str(output_path)
        }

    @staticmethod
    def detect_grid(image_path: str):

        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

        if image is None:
            raise ValueError("Unable to read processed image.")

        # Edge Detection
        edges = cv2.Canny(image, 50, 150)

        # Hough Line Detection
        lines = cv2.HoughLinesP(
            edges,
            rho=1,
            theta=np.pi / 180,
            threshold=80,
            minLineLength=100,
            maxLineGap=10,
        )

        output = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)

        vertical_lines = []
        horizontal_lines = []

        if lines is not None:

            for line in lines:

                coords = np.array(line).flatten()

                if len(coords) != 4:
                    continue

                x1, y1, x2, y2 = coords

                # Vertical Line
                if abs(x1 - x2) < 5:

                    vertical_lines.append((x1, y1, x2, y2))

                    cv2.line(
                        output,
                        (x1, y1),
                        (x2, y2),
                        (0, 0, 255),
                        2,
                    )

                # Horizontal Line
                elif abs(y1 - y2) < 5:

                    horizontal_lines.append((x1, y1, x2, y2))

                    cv2.line(
                        output,
                        (x1, y1),
                        (x2, y2),
                        (255, 0, 0),
                        2,
                    )

        grid_dir = Path("uploads/grid")
        grid_dir.mkdir(parents=True, exist_ok=True)

        output_path = grid_dir / (
            Path(image_path).stem + "_grid.png"
        )

        cv2.imwrite(str(output_path), output)

        return {
            "grid_image": str(output_path),
            "vertical_lines": len(vertical_lines),
            "horizontal_lines": len(horizontal_lines),
        }

    @staticmethod
    def extract_graph_region(image_path: str):

        image = cv2.imread(image_path)

        if image is None:
            raise ValueError("Unable to read image.")

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        _, thresh = cv2.threshold(
            gray,
            220,
            255,
            cv2.THRESH_BINARY_INV,
        )

        contours, _ = cv2.findContours(
            thresh,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE,
        )

        if not contours:
            raise ValueError("No graph detected.")

        largest = max(contours, key=cv2.contourArea)

        x, y, w, h = cv2.boundingRect(largest)

        cropped = image[y:y+h, x:x+w]

        crop_dir = Path("uploads/cropped")
        crop_dir.mkdir(parents=True, exist_ok=True)

        output_path = crop_dir / (
            Path(image_path).stem + "_cropped.png"
        )

        cv2.imwrite(str(output_path), cropped)

        return {
            "cropped": str(output_path),
            "x": x,
            "y": y,
            "width": w,
            "height": h,
        }