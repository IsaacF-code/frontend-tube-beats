export function formatDuration(duration: number): string { // Convertendo a duração de segundos para minutos
      const minutes = Math.floor(duration / 60);
      const secondsRemaining = duration % 60;
      const minutesFormatted = minutes.toString().padStart(2, '0');
      const secondsFormatted = secondsRemaining.toString().padStart(2, '0');
      const durationFormatted = `${minutesFormatted}:${secondsFormatted}`;
      return durationFormatted;
  }