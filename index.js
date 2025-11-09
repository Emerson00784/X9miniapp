import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Menu principal
const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🛒 Comprar e Vender", callback_data: "comprar_vender" }],
      [{ text: "🏆 Top Compradores", callback_data: "top_compradores" }],
      [{ text: "🎁 Airdrops", callback_data: "airdrops" }],
      [{ text: "👥 Comunidade", callback_data: "comunidade" }],
      [{ text: "ℹ️ Sobre X9", callback_data: "sobre_x9" }],
      [{ text: "💰 Wallet", callback_data: "wallet" }],
      [{ text: "❓ Ajuda", callback_data: "ajuda" }]
    ]
  }
};

// Submenus
const subMenus = {
  comprar_vender: {
    text: "🛒 Menu de Compra e Venda",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Comprar Tokens", url: "https://pump.fun" }],
        [{ text: "Vender Tokens", url: "https://pump.fun" }],
        [{ text: "⬅️ Voltar", callback_data: "voltar_menu" }]
      ]
    }
  },
  top_compradores: {
    text: "🏆 Top Compradores",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Ver Ranking", url: "https://t.me/XX9ME" }],
        [{ text: "⬅️ Voltar", callback_data: "voltar_menu" }]
      ]
    }
  },
  airdrops: {
    text: "🎁 Airdrops disponíveis",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Participar de Airdrops", url: "https://pump.fun" }],
        [{ text: "⬅️ Voltar", callback_data: "voltar_menu" }]
      ]
    }
  },
  comunidade: {
    text: "👥 Junte-se à Comunidade",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Canal Oficial", url: "https://t.me/XX9ME" }],
        [{ text: "⬅️ Voltar", callback_data: "voltar_menu" }]
      ]
    }
  },
  sobre_x9: {
    text: "ℹ️ Sobre o X9",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Saiba Mais", url: "https://pump.fun/coin/4LxopEqFTyM2tMrDX6bHHtZkaQPctahZri3hwzd8kLnE" }],
        [{ text: "⬅️ Voltar", callback_data: "voltar_menu" }]
      ]
    }
  },
  wallet: {
    text: "💰 Sua Wallet",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Conectar Wallet", url: "https://pump.fun" }],
        [{ text: "⬅️ Voltar", callback_data: "voltar_menu" }]
      ]
    }
  },
  ajuda: {
    text: "❓ Ajuda e Suporte",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Contato", url: "https://t.me/XX9ME" }],
        [{ text: "⬅️ Voltar", callback_data: "voltar_menu" }]
      ]
    }
  }
};

app.post("/webhook", (req, res) => {
  const { message, callback_query } = req.body;

  let response;

  if (message) {
    response = {
      chat_id: message.chat.id,
      text: "👋 Bem-vindo ao Mini App X9! Escolha uma opção abaixo:",
      ...mainMenu
    };
  }

  if (callback_query) {
    const data = callback_query.data;
    const chat_id = callback_query.message.chat.id;

    if (data === "voltar_menu") {
      response = { chat_id, text: "🔙 Voltando ao menu principal:", ...mainMenu };
    } else if (subMenus[data]) {
      response = { chat_id, ...subMenus[data] };
    }
  }

  res.json(response || {});
});

app.listen(3000, () => console.log("🚀 X9 Mini App rodando na porta 3000"));
