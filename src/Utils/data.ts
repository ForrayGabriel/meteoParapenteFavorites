import { Data, Datum, hours } from "../Services/types";

export function getWindData(data: Data, altitude: number, delta: number) {
  const values: {
    hour: string;
    winds: { altitude: number; angle: number; force: number }[];
  }[] = [];

  const altitudes =
    delta === 0 ? [altitude] : getAltitudeList(data, altitude, delta);

  hours.forEach((hour) => {
    values.push({
      hour: hour.number + 1 + ":00",
      winds: getWindDataForHour(data.data[hour.time], altitudes),
    });
  });

  return { altitudes: altitudes, windData: values };
}

function getWindDataForHour(
  data: Datum,
  altitudes: number[]
): { altitude: number; angle: number; force: number }[] {
  const result: { altitude: number; angle: number; force: number }[] = [];
  altitudes.reverse().forEach((altitude) => {
    const { u, v } = interpolateUandV(data, altitude);
    const { angle, force } = vectorsToArrow(u, v);
    result.push({ altitude, angle, force });
  });
  return result;
}

function getAltitudeList(data: Data, altitude: number, delta: number) {
  let { min, roundedMin, roundedMax, max } = getMinMaxAltitude(data);
  const altitudes = [];

  if (altitude - delta > min) {
    min = altitude - delta;
    roundedMin = (Math.round(min / 100) + 1) * 100;
  }
  if (altitude + delta < max) {
    max = altitude + delta;
    roundedMax = (Math.round(max / 100) - 1) * 100;
  }
  altitudes.push(Math.round(min));
  for (let i = roundedMin; i <= roundedMax; i += 100) {
    altitudes.push(i);
  }
  return altitudes;
}

function getMinMaxAltitude(data: Data) {
  const altitudes = data.data["04:00"].z;
  return {
    min: altitudes[0],
    roundedMin: (Math.round(altitudes[0] / 100) + 1) * 100,
    max: altitudes[altitudes.length - 1],
    roundedMax: (Math.round(altitudes[altitudes.length - 1] / 100) - 1) * 100,
  };
}

function interpolateUandV(data: Datum, altitude: number) {
  const closedIndex = findClosestUnderIndex(altitude, data.z);
  const lowAlti = data.z[closedIndex - 1];
  const highAlti = data.z[closedIndex];
  const lowU = data.umet[closedIndex - 1];
  const highU = data.umet[closedIndex];
  const lowV = data.vmet[closedIndex - 1];
  const highV = data.vmet[closedIndex];
  return {
    u: interpolate(altitude, lowAlti, highAlti, lowU, highU),
    v: interpolate(altitude, lowAlti, highAlti, lowV, highV),
  };
}

function findClosestUnderIndex(altitude: number, data: number[]) {
  let index = 0;
  while (data[index] < altitude) {
    index += 1;
  }
  return index;
}

export function getMinAltitude(data: Data) {
  const minAlti = data.data["04:00"].z[0];
  return Math.round(minAlti / 100) * 100;
}

export function interpolate(
  zx: number,
  za: number,
  zb: number,
  a: number,
  b: number
) {
  return a + (b - a) * ((zx - za) / (zb - za));
}

export function vectorsToArrow(u: number, v: number) {
  return { angle: getAngle(u, v), force: normalise(u, v) };
}

function normalise(u: number, v: number) {
  return Math.sqrt(u * u + v * v);
}

function getAngle(u: number, v: number) {
  console.log(u, v);
  return (Math.atan2(v, u) * 180) / Math.PI;
}

export function getColor(force: number) {
  const nombre = Math.max(0, Math.min(20, force));

  // Calculer les composantes R, G, B
  const rouge = Math.floor(((nombre <= 10 ? nombre : 20 - nombre) * 255) / 10);
  const vert = Math.floor(((nombre <= 10 ? 10 - nombre : 0) * 255) / 10);
  const bleu = 0;

  // Retourner la couleur au format RGB
  return "rgb(" + rouge + "," + vert + "," + bleu + ")";
}

export function angleToOrientation(angle: number) {
  if (angle <= 157.5 && angle > 112.5) {
    return "SE";
  } else if (angle <= 112.5 && angle > 77.5) {
    return "S";
  } else if (angle <= 77.5 && angle > 22.5) {
    return "SO";
  } else if (angle <= 22.5 && angle > -22.5) {
    return "O";
  } else if (angle <= -22.5 && angle > -77.5) {
    return "NO";
  } else if (angle <= -77.5 && angle > -112.5) {
    return "N";
  } else if (angle <= -112.5 && angle > -157.5) {
    return "NE";
  } else {
    return "E";
  }
}
