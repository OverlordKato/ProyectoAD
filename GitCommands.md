## Crea una nueva rama.

```

  git checkout -b feature/loquesea

```

  

## Mira los cambios realizados en local.

```

  git diff

```

  
  

## Cambia a esa rama.

```

  git checkout nombredelarama

```

## Añade todos los cambios al commit (staged).

```

  git add -A

```

## Añade los cambios del archivo al commit.

```

  git add nombredelarchivo

```

## Crea el commit.

```

  git commit -m 'comentariodelcommit'

```

## Para ver el estado actual.

```

  git status

```

## Añade más cambios a un commit ya creado, primero haz un `add` del archivo.

```

  git commit --amend

```

## Muestra los cambios realizados.

```

  git log

```

  

## Muestra cómo estaba ese archivo en ese commit.

```

  git checkout iddelcommit

```

## Vuelve al commit pero deja los cambios locales.

```

  git reset iddelcommit


```

  

## Vuelve al commit y borra cambios locales.

```

  git reset ####hard iddelcommit

```

## Sube el commit de la rama actual a la nube.

```

  git push 

```

## Para subir un cambio de un commit ####amend.

```  

  git push --force

```

## Descarga los commits de las ramas hechos por otros en la nube.

```  

  git pull

```

## Mejor verlo desde GitHub.

```

  git merge

```

## Muestra ayuda.

```
  git help

```

## Guarda los cambios en el stash y los quita del directorio actual.

```  

  git stash push
  
```

## Saca los cambios del stash y los coloca donde estaban si no hay conflictos.

```

  git stash pop numerodestash

```

## Añade una tag a un commit.

```

  git tag loquesea -m 'loquesea'

```

## Sube las tags.

```

  git push --tags

```
