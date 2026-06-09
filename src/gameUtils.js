export const getNumberName = (numStr) => {
  const names = {
    '0': 'CERO', '1': 'UNO', '2': 'DOS', '3': 'TRES', '4': 'CUATRO',
    '5': 'CINCO', '6': 'SEIS', '7': 'SIETE', '8': 'OCHO', '9': 'NUEVE',
    '10': 'DIEZ', '11': 'ONCE', '12': 'DOCE'
  };
  return names[numStr] || '';
};

export const getCardStyle = (value) => {
  const baseStyle = "bg-white border-2 border-black shadow-[3px_3px_0px_#000000]";
  
  if (value === 'Salva') return { style: baseStyle, text: 'text-green-600', innerText: 'VIDA EXTRA', displayValue: '🛡️' };
  if (value === 'Congelar') return { style: baseStyle, text: 'text-blue-600', innerText: 'CONGELA', displayValue: '❄️' };
  if (value === 'Flip 3') return { style: baseStyle, text: 'text-purple-600', innerText: 'FLIP 3', displayValue: '⚔️' };
  if (value.includes('+') || value.includes('x')) return { style: baseStyle, text: 'text-red-600', innerText: 'BONO', displayValue: value };

  const num = parseInt(value);
  let color = 'text-black'; 
  if (num === 0) color = 'text-pink-600'; else if (num === 4) color = 'text-teal-600'; else if (num === 6) color = 'text-purple-700'; else if (num === 9) color = 'text-orange-600'; else if (num === 11) color = 'text-blue-700'; else if (num === 12) color = 'text-amber-700'; 

  return { style: baseStyle, text: color, innerText: getNumberName(value), displayValue: value };
};