from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
from app.services.image_analysis_service import ImageAnalysisService
import shutil
import uuid

router = APIRouter(
    prefix="/image-analysis",
    tags=["Image Analysis"]
)

UPLOAD_DIR = Path("uploads/audiograms")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".bmp",
    ".tif",
    ".tiff",
}


@router.post("/upload")
async def upload_audiogram(file: UploadFile = File(...)):
    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PNG, JPG, JPEG, WEBP, BMP, TIF and TIFF files are allowed."
        )

    filename = f"{uuid.uuid4()}{extension}"
    filepath = UPLOAD_DIR / filename

    with filepath.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = ImageAnalysisService.preprocess_image(str(filepath))
    grid = ImageAnalysisService.detect_grid(
        result["processed"])

    crop = ImageAnalysisService.extract_graph_region(
    result["processed"]
    )

    return {
    "status": "success",
    "message": "Image processed successfully. Automatic threshold extraction is not available. Please enter thresholds manually to run AI analysis.",
    "original": original_path,
    "processed": processed_path,
    "cropped_graph": cropped_path
}
