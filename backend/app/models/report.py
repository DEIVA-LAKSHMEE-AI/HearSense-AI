from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id"),
        nullable=False
    )

    audiogram_id = Column(
        Integer,
        ForeignKey("audiograms.id"),
        nullable=False
    )

    diagnosis = Column(String, nullable=False)

    confidence = Column(Float)

    right_pta = Column(Float)

    left_pta = Column(Float)

    disability = Column(Float)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )