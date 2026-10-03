export function formatDuration(duration: number): string { 
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const secondsRemaining = duration % 60;
      const hoursFormatted = hours.toString().padStart(2, '0');
      const minutesFormatted = minutes.toString().padStart(2, '0');
      const secondsFormatted = secondsRemaining.toString().padStart(2, '0');
      const durationFormatted = hours > 0 ? `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}` : `${minutesFormatted}:${secondsFormatted}`;
      return durationFormatted;
  }