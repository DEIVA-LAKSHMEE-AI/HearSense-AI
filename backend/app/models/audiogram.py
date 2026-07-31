from sqlalchemy import Column, Integer, Float, Date, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Audiogram(Base):
    __tablename__ = "audiograms"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id"),
        nullable=False
    )

    test_date = Column(Date, nullable=False)

    right_250 = Column(Float)
    right_500 = Column(Float)
    right_1000 = Column(Float)
    right_2000 = Column(Float)
    right_4000 = Column(Float)
    right_8000 = Column(Float)

    left_250 = Column(Float)
    left_500 = Column(Float)
    left_1000 = Column(Float)
    left_2000 = Column(Float)
    left_4000 = Column(Float)
    left_8000 = Column(Float)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )