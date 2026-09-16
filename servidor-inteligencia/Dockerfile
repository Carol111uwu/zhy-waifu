FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY src ./src
ENV PYTHONPATH=/app/src
CMD ["sh", "-c", "uvicorn zhy_companion_servidor.iniciar_servidor:aplicacion --host 0.0.0.0 --port ${PORT:-8000}"]
