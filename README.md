# SafeOnTheRoad

## APIServer.. 

![https://raw.github.com/actionhero/actionhero/master/public/logo/actionhero-small.png](https://raw.github.com/actionhero/actionhero/master/public/logo/actionhero-small.png)




## Introducción
El desarrollo web.....

## Requisitos
- [NodeJS v6.*.*](https://nodejs.org/es/)



## ¿Cómo instalar  el Servidor?
Primero que nada se debe de ejecutar el comando para clonar el proyecto:
```bash
git clone http://148.217.200.108:89/santiago/SafeOnTheRoad.git
cd SafeOnTheRoad
```

## ¿Cómo descargar las dependencias?
Con el siguiente comando descargamos las dependencias indicadas en package.json. Cabe mencionar que exisitirá un package.json en cada carpeta (Frontend/Backend)
```bash
cd Frontend
npm install
```
## Instalar el Framework ActionHeroJS
Se instala el framework de manera global para que se pueda ejecutar el comando actionhero. Dicha instalación se realiza con el comando:
```bash
npm install -g actionhero
```

## Instalar rethinkdb y ejecutar
Con este comando especificas el puerto de comunicación de escucha.
```bash
rethinkdb --bind all --http-port 9090
```


## ¿Cómo correr el servidor?
El siguiente comando realiza la tarea de correr el servidor.
```bash
actionhero start
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