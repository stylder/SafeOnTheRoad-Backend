# SafeOnTheRoad

## APIServer..

![https://raw.github.com/actionhero/actionhero/master/public/logo/actionhero-small.png](https://raw.github.com/actionhero/actionhero/master/public/logo/actionhero-small.png)

## Requisitos
- [NodeJS v6.*.*](https://nodejs.org/es/)
- [MongoDB v3.*.*](https://www.mongodb.com/es)
- [Redis](https://askubuntu.com/questions/868848/how-to-install-redis-on-ubuntu-16-04)


## Crear Base de Datos
Entrar a la consola de mongo con:
```bash
mongo
```

Crear la base de datos
```bash
use safeontheroad
```

Verificar que se haya creado la base de datos:
```bash
use safeontheroad
```

## Instalar el Framework ActionHeroJS
Se instala el framework de manera global para que se pueda ejecutar el comando
actionhero. Dicha instalación se realiza con el comando:
```bash
npm install -g actionhero
```
## ¿Cómo descargar las dependencias?
Con el siguiente comando descargamos las dependencias indicadas en package.json.
Cabe mencionar que exisitirá un package.json en cada carpeta (Frontend/Backend)
```bash
npm install
npm install fakeredis
npm install nodemailer
npm install fs-extra
npm install mongoose
npm install md5
npm install uuid
npm install mongoose-role
```

## ¿Cómo correr el servidor?
El siguiente comando realiza la tarea de correr el servidor.
```bash
actionhero
```

## Comandos de ActionHeroJS

### Generar un Inicializador
```bash
actionhero generate initializer --name=initBear
```

### Generar un Action
```bash
actionhero generate action --name=myBear
```

### Generar un Task
```bash
actionhero generate task --name=drinkBear
```
