export interface IWeather {
  weather: 'dry' | 'mud' | 'h.mud' | 'snow' | 'blizzard';
  level: number;
}

export function newWeather(): IWeather {
  return {
    weather: 'dry',
    level: 0,
  };
}

export const Weather = {
  rain(curWeather: IWeather, rainLv: number = 1): IWeather {
    const level = Math.max(curWeather.level, 0) + rainLv;
    const weather = level > 2 ? 'h.mud' : 'mud';
    return {
      weather, level,
    };
  },
  snow(curWeather: IWeather, snowLv: number = 1): IWeather {
    const level = Math.max(curWeather.level, 0) + snowLv;
    const weather = level > 2 ? 'blizzard' : 'snow';
    return {
      weather, level,
    };
  },
  clear(curWeather: IWeather): IWeather {
    let level = 0;
    if (curWeather.level > 2) {
      level = 2
    } else if (curWeather.level > 0) {
      level = curWeather.level - 1;
    }

    let weather = curWeather.weather;
    if (level === 0) {
      weather = 'dry';
    } else if (curWeather.weather === 'blizzard') {
      weather = 'snow';
    } else if (curWeather.weather === 'h.mud') {
      weather = 'mud';
    }

    return {
      weather, level,
    }
  }
}
