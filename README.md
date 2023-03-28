# Challenge

Este challenge esta hecho en Angular 14 con Angular Material

## Installation

El proyecto esta dockerizado, para levantarlo seguir los siguientes pasos:

```bash
# clonar repositorio
git clone https://github.com/gaabicarp/Challenge-W2M

# Luego entrar en la carpeta del proyecto y ejecutar
docker build -t challenge-w2 .

docker run -d -it -p 80:80 challenge-w2

#El proyecto estara disponible en el puerto 80 (localhost:80)
```
