# Gestion de document

Plateforme de partage de documents PDF
Permet de partager differents types de documents avec un client

## Criteres

- Test TDD
- Decouple (Clean archi)
- Clean code
- 2 adapteurs pour chaque gateway (dont 1 InMemory)
- Typescript
- 1 seule commande pour lancer
- Front (1 repo git) Techno libre
- Back (1 repo git) Techno libre

## Usecases

### Documents
- Ajouter un document pour un client
- Supprimer un document
- Lister les documents
- Modifier un documents*
- Voir un document
- Rechercher un document
- Filtrer sur client / Type de document (Facture, Devis ...)

### Clients
- Ajouter un client
- Supprimer un client
- Lister les clients
- Modifier un client
- Voir un client

### User
- Authentifier un utilisateur*
