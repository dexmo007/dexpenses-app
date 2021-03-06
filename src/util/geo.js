// eslint-disable-next-line import/prefer-default-export
export function parseBigQueryGeographicPoint(point) {
  if (!point) {
    return point;
  }
  const m = point.value.match(/^POINT\((.*)\)$/);
  if (!m) {
    return null;
  }
  const [lng, lat] = m[1].split(' ').map(p => Number(p));
  return { lng, lat };
}

export function isBoundsWithin(outer, inner) {
  const osw = outer.getSouthWest()
  const one = outer.getNorthEast()
  const ine = inner.getNorthEast()
  const isw = inner.getNorthEast()
  return isw.lng() >= osw.lng()
  && isw.lat() >= osw.lat()
  && ine.lng() <= one.lng()
  && ine.lat() <= one.lat();
}