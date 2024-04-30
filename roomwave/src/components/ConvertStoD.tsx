import React, { useState, useEffect } from 'react';

interface Quarto {
    id: number;
    data_entrada: Date;
    data_saida: Date;
  }
function ConvertStoD() {
  const [quartos, setQuartos] = useState<Quarto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('rooms.json');
        const data = await response.json();

        // Convertendo strings de data de entrada e saída de volta para objetos Date
        const quartosComData = data.map((quarto:Quarto) => ({
          ...quarto,
          data_entrada: new Date(quarto.data_entrada),
          data_saida: new Date(quarto.data_saida)
        }));

        setQuartos(quartosComData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

}

export default ConvertStoD;
