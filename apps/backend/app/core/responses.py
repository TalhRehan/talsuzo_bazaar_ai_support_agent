from typing import Generic, TypeVar

from pydantic import BaseModel


DataT = TypeVar("DataT")


class ApiResponse(BaseModel, Generic[DataT]):
    success: bool
    message: str
    data: DataT


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error_code: str
