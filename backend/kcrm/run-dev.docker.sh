
docker build -t kcrm.web .
docker run -e ConnectionStrings__KCrmConnection="Server=192.168.0.35,1433;Database=K_CRM_Dev;User ID=sa;Password=developer.7777" \
-e Minio__Endpoint="192.168.0.35,12900" -it -p 32000:80  kcrm.web