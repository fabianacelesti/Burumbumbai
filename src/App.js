import { useState } from "react";

export default function BurumbumbaiSelector() {
  const pizze = [
    "Rossa 🍕",
    "Focaccia 🍕",
    "Marinara 🍕",
    "Margherita 🍕",
    "Napoli 🍕",
    "Capricciosa 🍕",
    "Funghi 🍕",
    "Boscaiola 🍕",
    "Crostino Cotto 🍕",
    "Crostino Crudo 🍕",
    "Provola e Speck 🍕",
    "4 Formaggi 🍕",
    "4 Stagioni 🍕",
    "Diavola 🍕",
    "Fiori di Zucca 🍕",
    "Salmone e Mozzarella 🍕",
    "Bufala e Pachino 🍕",
    "Patate e Salsiccia 🍕",
    "Peperoni e Salsiccia 🍕",
    "Parmigiana 🍕",
    "Broccoli e Salsiccia 🍕",
    "Insalata di Pollo 🍕",
    "Gamberetti 🍕",
    "Radicchio e Gorgonzola 🍕",
    "Verdura Mista 🍕",
  ];
  const [selectedPizza, setSelectedPizza] = useState([]);
  const pizzaCount = {};
  const fritti = [
    "Crocchetta🍟",
    "Supplì🍟",
    "Fiore di Zucca🍟",
    "Filetti di Baccalà 🍟",
    "Patatine Fritte 🍟",
    "Mozzarelline Fritte 🍟",
    "Olive Ascolane 🍟",
    "Chele di Granchio 🦀",
    "Pollo Arrosto 🍗",
    "Pollo Arrosto con patate 🍗🍟",
    "Verdure di Stagione 🥦",
  ];
  const [selectedFritto, setSelectedFritto] = useState([]);
  const frittoCount = {};
  const [name, setName] = useState("");

  // CONTA PIZZE
  selectedPizza.forEach((pizza) => {
    if (pizzaCount[pizza]) {
      pizzaCount[pizza] += 1;
    } else {
      pizzaCount[pizza] = 1;
    }
  });

  // CONTA FRITTI
  selectedFritto.forEach((fritto) => {
    if (frittoCount[fritto]) {
      frittoCount[fritto] += 1;
    } else {
      frittoCount[fritto] = 1;
    }
  });

  // FUNZIONE INVIO ORDINE SU TELEGRAM
  async function sendOrder() {
    let message = `🍕 ORDINE BURUMBUMBAI 🍕\n\n`;
    message += `Nome: ${name}\n\n`;

    message += `Pizze:\n`;
    Object.entries(pizzaCount).forEach(([pizza, count]) => {
      message += `${pizza} x${count}\n`;
    });

    message += `\nFritti:\n`;
    Object.entries(frittoCount).forEach(([fritto, count]) => {
      message += `${fritto} x${count}\n`;
    });

    const token = "8728447970:AAHx1wm2-0N2gD0_zVxIYxP7O3UEvoPIdgk";
    const chatId = "403442754";

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });

      alert("Ordine inviato! 🍕📩");

      // Reset ordine dopo invio
      setSelectedPizza([]);
      setSelectedFritto([]);
      setName("");
    } catch (err) {
      console.error("Errore invio ordine:", err);
      alert("Errore nell'invio dell'ordine 😢");
    }
  }

  return (
    <>
      <h1 style={{ color: "#800020" }}>Burumbumbai 🍕🐵​</h1>

      <div style={{ display: "flex", gap: "100px" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
          <h1>Scegli la tua pizza 🍕😋</h1>
          {pizze.map((pizza) => (
            <button
              key={pizza}
              onClick={() => setSelectedPizza((prev) => [...prev, pizza])}
              style={{ display: "block", marginBottom: "3px" }}
            >
              {pizza}
            </button>
          ))}
          <button onClick={() => setSelectedPizza([])} disabled={selectedPizza.length === 0}>
            Aricominciamo 🔄
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
          <h1>Scegli il tuo fritto 🍟😋</h1>
          {fritti.map((fritto) => (
            <button
              key={fritto}
              onClick={() => setSelectedFritto((prev) => [...prev, fritto])}
              style={{ display: "block", marginBottom: "3px" }}
            >
              {fritto}
            </button>
          ))}
          <button onClick={() => setSelectedFritto([])} disabled={selectedFritto.length === 0}>
            Aricominciamo 🔄
          </button>
        </div>
      </div>

      <hr style={{ marginBottom: "25px", marginTop: "25px" }} />

      <div style={{ display: "flex", gap: "150px" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
          <h3>Pizze scelte 🍕😋</h3>
          <p>Totale: {selectedPizza.length} pizze 🍕</p>
          {Object.entries(pizzaCount).map(([pizza, count]) => (
            <div key={pizza} style={{ marginBottom: "5px" }}>
              {pizza}
              <button
                onClick={() => {
                  const newList = [...selectedPizza];
                  const index = newList.indexOf(pizza);
                  newList.splice(index, 1);
                  setSelectedPizza(newList);
                }}
                style={{ marginLeft: "10px" }}
              >
                ➖
              </button>
              <span style={{ margin: "0 10px", color: "red" }}>{count}</span>
              <button onClick={() => setSelectedPizza([...selectedPizza, pizza])}>➕</button>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
          <h3>Fritti scelti 🍟😋</h3>
          <p>Totale: {selectedFritto.length} fritti 🍟</p>
          {Object.entries(frittoCount).map(([fritto, countFritto]) => (
            <div key={fritto} style={{ marginBottom: "5px" }}>
              {fritto}
              <button
                onClick={() => {
                  const newListFritto = [...selectedFritto];
                  const indexFritto = newListFritto.indexOf(fritto);
                  newListFritto.splice(indexFritto, 1);
                  setSelectedFritto(newListFritto);
                }}
                style={{ marginLeft: "10px" }}
              >
                ➖
              </button>
              <span style={{ margin: "0 10px", color: "red" }}>{countFritto}</span>
              <button onClick={() => setSelectedFritto([...selectedFritto, fritto])}>➕</button>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ marginBottom: "25px", marginTop: "25px" }} />

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          placeholder="Il tuo nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px" }}
        />
        <button
          onClick={sendOrder}
          disabled={name === "" || (selectedPizza.length === 0 && selectedFritto.length === 0)}
          style={{
            padding: "8px",
            cursor:
              name === "" || (selectedPizza.length === 0 && selectedFritto.length === 0)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Invia ordine 📩
        </button>
      </div>
    </>
  );
}
