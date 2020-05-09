
docker build -t kcrm.web .
docker run -e ConnectionStrings__KCrmConnection="Server=192.168.0.35,12330;Database=kcrm;User ID=sa;Password=VeryStrongPass@" \
-e Minio__Endpoint="192.168.0.35,12900" -it -p 32000:80  kcrm.web