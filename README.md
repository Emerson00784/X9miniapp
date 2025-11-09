# x9 mini app

Template Mini App + Bot para Telegram.

## O que tem aqui
- `server.js` - servidor Express + Bot (grammy). Reads BOT_TOKEN and TOKEN_MINT from env.
- `public/index.html` - Mini App frontend (Web App) that chama /api endpoints.

## Deploy no Railway (resumido)
1. Crie um repositório no GitHub com estes arquivos ou use "New Project -> Deploy from GitHub" no Railway.
2. Configure Environment Variables no Railway:
   - `BOT_TOKEN` = token do BotFather
   - `TOKEN_MINT` = sua moeda (opcional)
   - `COMMUNITY_URL` = https://t.me/XX9ME
   - `APP_URL` = sua URL pública da Railway (opcional)
3. Deploy e copie a URL do app (ex: https://your-app.up.railway.app)
4. No BotFather, configure o botão do bot para abrir a URL como Web App (/setmenu or Menu Button -> Web App).
5. Teste: envie /start no Telegram e clique em "Abrir Mini App".

## Segurança
- **NÃO** coloque seu BOT_TOKEN diretamente no código em repositórios públicos. Use Environment Variables.

--- 
