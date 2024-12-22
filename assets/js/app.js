const select = document.getElementById("select");

const btnBuscar = document.getElementById("buscar");

const input = document.getElementById("input");

const error = document.getElementById("error");

async function getMon() {
  try {
    const res = await fetch("https://mindicador.cl/api/");
    const monedas = await res.json();
    return monedas;
  } catch (error) {
    error.innerHTML = `Se produjo un error`;
  }
}

async function renderDolar() {
  const monedas = await getMon();
  const valorDolar = monedas.dolar.valor;
  return valorDolar;
}
async function renderUf() {
  const monedas = await getMon();
  const valorUf = monedas.uf.valor;
  return valorUf;
}

const labelResult = document.getElementById("resultado");
btnBuscar.addEventListener("click", async () => {
  const dolar = await renderDolar();
  const valorSelect = select.value;
  const uf = await renderUf();
  const valorInput = Number(input.value);

  let divChart = document.getElementById("myChart");

  async function getDolar() {
    try {
      const res = await fetch("https://mindicador.cl/api/dolar");
      const dolar = await res.json();
      return dolar;
    } catch {
      error.innerHTML = `Se produjo un error`;
    }

  }


  async function getUf() {
    try {
      const res = await fetch("https://mindicador.cl/api/uf");
      const uf = await res.json();
      return uf;
    } catch {
      error.innerHTML = `Se produjo un error`;
    }
  }
  if (valorSelect === "dolar") {

    const resultado = valorInput / dolar;

    labelResult.innerHTML = `Resultado: $${Math.floor(
      resultado
    )} <strong>Dolares</strong>`;

    const dolarG = await getDolar();

    
    const tdDolar = dolarG.serie;

    const unDate = tdDolar.map((element) => {
      return element.fecha.split("T")[0];
    });

    const unDateR = unDate.reverse();

    const unValor = tdDolar.map((element) => {
      return element.valor;
    });
    const unValorR = unValor.reverse()

    const myChart = new Chart(divChart, {
      type: "line",
      data: {
        labels: unDateR.splice(21, 31),
        datasets: [
          {
            label: "Valor",
            data: unValorR.splice(21, 31),
          },
        ],
      },
    });

  } else if (valorSelect == "uf") {
    const resultado = valorInput / uf;
    labelResult.innerHTML = `Resultado: $${resultado.toFixed(
      4
    )} <strong>UF</strong>`;

    const ufG = await getUf();

    const tdUf = ufG.serie;

    const unDate = tdUf.map((element) => {
      return element.fecha.split("T")[0];
    });
    const unDateR = unDate.reverse()

    const unValor = tdUf.map((element) => {
      return element.valor;
    });
    const unValorR = unValor.reverse()
    const myChart = new Chart(divChart, {
      type: "line",
      data: {
        labels: unDateR.splice(21, 31),
        datasets: [
          {
            label: "Valor",
            data: unValorR.splice(21, 31),
          },
        ],
      },
    });

  } else {
    labelResult.innerHTML = `Seleccione la moneda`;
  }
});

renderDolar();
