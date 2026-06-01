from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.responses import ApiResponse
from app.modules.admin.router import router as admin_router
from app.modules.refunds.router import router as refunds_router


app = FastAPI(
    title=settings.app_name,
    description="FastAPI backend for ecommerce refund support and AI agent workflows.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", response_model=ApiResponse[dict[str, str]])
def health_check() -> ApiResponse[dict[str, str]]:
    return ApiResponse(
        success=True,
        message="TalSuzo Bazaar backend is healthy.",
        data={
            "status": "ok",
            "service": "talsuzo-bazaar-backend",
            "environment": settings.environment,
        },
    )


app.include_router(refunds_router, prefix="/api/refunds", tags=["refunds"])
app.include_router(admin_router, prefix="/api/admin", tags=["admin"])
