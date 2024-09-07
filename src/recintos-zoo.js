class RecintosZoo {

  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(especie, quantidade) {
    
    if (!this.animais[especie]) {
      return { erro: 'Animal inválido' };
    }

    if (typeof quantidade !== 'number' || quantidade <= 0) {
      return { erro: 'Quantidade inválida' };
    }

    const animalInfo = this.animais[especie];
    const tamanhoNecessario = animalInfo.tamanho * quantidade;

    let recintosViaveis = [];

    for (let recinto of this.recintos) {
      let espacoOcupado = 0;
      let animaisExistentes = recinto.animais;

      if (!animalInfo.biomas.includes(recinto.bioma) &&
          !(animalInfo.biomas.includes('savana') && recinto.bioma === 'savana e rio')) {
        continue;
      }

      for (let animalExistente of animaisExistentes) {
        let infoAnimalExistente = this.animais[animalExistente.especie];
        espacoOcupado += infoAnimalExistente.tamanho * animalExistente.quantidade;


        if (animalInfo.carnivoro && animalExistente.especie !== especie) {
          espacoOcupado = recinto.tamanho + 1;
          break;
        }

        if (!animalInfo.carnivoro && infoAnimalExistente.carnivoro) {
          espacoOcupado = recinto.tamanho + 1;
          break;
        }
      }

      if (animaisExistentes.length > 0 && !animaisExistentes.some(a => a.especie === especie)) {
        espacoOcupado += 1;
      }

      if (especie === 'MACACO') {
        const totalAnimaisDepois = animaisExistentes.reduce((sum, a) => sum + a.quantidade, 0) + quantidade;
        if (totalAnimaisDepois < 2) {
          continue;
        }
      }

      if (recinto.tamanho >= espacoOcupado + tamanhoNecessario) {
        recintosViaveis.push({
          numero: recinto.numero,
          espacoLivre: recinto.tamanho - (espacoOcupado + tamanhoNecessario),
          espacoTotal: recinto.tamanho
        });
      }
    }

    recintosViaveis.sort((a, b) => a.numero - b.numero);

    if (recintosViaveis.length > 0) {
      return {
        recintosViaveis: recintosViaveis.map(
          recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
        )
      };
    } else {
      return { erro: 'Não há recinto viável' };
    }
  }
}

export { RecintosZoo as RecintosZoo };
