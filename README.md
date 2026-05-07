# lp — Landing Pages VisualMKT

Repositório público com as landing pages dos clientes da agência VisualMKT.

## Arquitectura

Padrão **Opção B** (shell + JSON remoto):

```
{cliente}/
  index.html      ← shell estrutural (sobe 1x via FTP do cliente)
  config.json     ← conteúdo editável (servido por jsDelivr CDN)
```

O `index.html` no FTP do cliente faz `fetch` ao `config.json` neste repo via jsDelivr:

```
https://cdn.jsdelivr.net/gh/visualmkt/lp@main/{cliente}/config.json
```

## Edição

Edição de conteúdo é feita via Claude → push neste repo. Não requer novo upload FTP.

Apenas o owner faz push. Repo é público apenas para leitura por jsDelivr.
