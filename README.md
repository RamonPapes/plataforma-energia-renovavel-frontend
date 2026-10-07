# Frontend — Plataforma Energia Renovável

## Rodando integrado ao backend

Com o backend rodando em `http://localhost:3000` (veja o README do backend):

```bash
npm install
cp .env.example .env.local   # VITE_USE_MOCK=false e VITE_API_URL=/api
npm run dev
```

Em desenvolvimento, o Vite repassa as chamadas de `/api` para o backend (proxy em `vite.config.js`),
então não é preciso configurar CORS. Entre com um usuário cadastrado na API (o perfil vem do cadastro).

## Rodando sem backend (modo mock)

Defina `VITE_USE_MOCK=true` no `.env.local`. Qualquer e-mail/senha entra, e o perfil escolhido no login define o menu.

> Depois de alterar o `.env.local`, reinicie o `npm run dev`.

## Interpretação do resultado

Como no roteiro e na API: Ci mais perto de 1 = **menos** vulnerável. O 1º lugar do ranking é o menos vulnerável e o último, o mais vulnerável.
