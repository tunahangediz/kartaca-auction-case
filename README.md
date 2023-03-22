Bu proje, kullanıcıların açık artırma yapabildiği bir web uygulamasıdır. Kullanıcılar üyelik oluşturarak giriş yapabilir ve belirlenen ürünlere canlı olarak teklif verebilir. Projede arka uç için NodeJs , ön yüzde ise React kullanılmıştır. Oturum bilgileri Rediste, kullanıcı bilgileri Mongodb de bulunmaktadır.

![Uygulama Ekran Görüntüsü](inside-app-images/bid-screen.png)

## Kullanılan Teknolojiler

**İstemci:** React, TailwindCSS, socket.io

**Sunucu:** Node, Express, socket.io, mongoDB, Redis

## Kullanım

#### projeyi kendi bilgisayarımıza klonlayalım

```bash
    git clone https://github.com/tunahangediz/kartaca-auction-case.git
```

#### projeyi docker ile ayağa kaldırmak için

```bash
    docker-compose up -d --build
```

#### Proje localhost çalışma portları:

**İstemci:** http://localhost:3000/

**Sunucu:** http://localhost:4000/

## Registration Key

```json
    "registrationKey": "6599da9a351fbc51f2be77dc065d3c8374d3bcb22b5970d30bde1c83d665fb42"
```
