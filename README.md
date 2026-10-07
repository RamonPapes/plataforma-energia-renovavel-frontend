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

Com a base de exemplo do backend, já dá para entrar como administrador (`ADMIN_EMAIL`), pesquisador (`PESQUISADOR_EMAIL`) ou gestor público (`GESTOR_EMAIL`), com as senhas definidas no `.env` do backend.

## Usuários e contas

- **Usuários** (menu, só Administrador): listar com filtro por perfil, cadastrar com senha inicial, editar nome, e-mail e perfil, e remover. A API não deixa o administrador remover a própria conta nem trocar o próprio perfil, e o sistema nunca fica sem administrador.
- **Minha conta** (clique no seu nome, no topo): dados do usuário logado e troca da própria senha.
- **Esqueci minha senha** (tela de login): gera um código de redefinição e troca a senha. Enquanto o backend não envia e-mails, o código aparece na própria tela.

## Rodando sem backend (modo mock)

Defina `VITE_USE_MOCK=true` no `.env.local`. Qualquer e-mail/senha entra, e o perfil escolhido no login define o menu.

> Depois de alterar o `.env.local`, reinicie o `npm run dev`.

## Interpretação do resultado

Como no roteiro e na API: Ci mais perto de 1 = **menos** vulnerável. O 1º lugar do ranking é o menos vulnerável e o último, o mais vulnerável.
