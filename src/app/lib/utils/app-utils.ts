// export function formatNumberWithMask(v: string, mask: string): string {
//   if (!v) return '';

//   let val = v.replace(/\D/g, ''); // remove non-digits
//   let formatted = '';
//   let vi = 0;

//   for (let mi = 0; mi < mask.length && vi < val.length; mi++) {
//     if (mask[mi] === 'x') {
//       formatted += val[vi];
//       vi++;
//     } else {
//       if (mask[mi + 1] === 'x' && vi < val.length) {
//         formatted += mask[mi];
//       }
//     }
//   }

//   return formatted;
// }

export function formatNumberWithMask(v: string, mask: string): string {
  if (!v) return '';

  let val = v.replace(/\D/g, ''); // remove non-digits
  let formatted = '';
  let vi = 0;
  let finalValue = '';
  // Extract only the 'x' from the mask to calculate the maximum length of the input
  const maxInputLength = mask.replace(/[^x]/g, '').length;

  // If the length of the cleaned input value exceeds the maximum allowed, trim it
  val = val.slice(0, maxInputLength);

  for (let mi = 0; mi < mask.length && vi < val.length; mi++) {
    if (mask[mi] === 'x') {
      formatted += val[vi];
      vi++;
    } else {
      if (mask[mi + 1] === 'x' && vi < val.length) {
        formatted += mask[mi];
      }
    }
  }

  finalValue = formatted.substring(0, mask.length);
  console.log(finalValue);

  return finalValue;
}
