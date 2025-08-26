# 1) Base image with Python installed
FROM python:3.11-slim

# 2) Prevent Python from writing .pyc files & ensure logs flush immediately
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 3) Workdir inside the container
WORKDIR /app

# 4) Copy and install dependencies first (better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5) Copy the rest of the code
COPY . .

# 6) Expose the port your app listens on
EXPOSE 5000

# 7) Default command to start the app
CMD ["python", "app.py"]

