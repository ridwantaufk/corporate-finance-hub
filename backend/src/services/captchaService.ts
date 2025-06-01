/// <reference path="../types/express-session.d.ts" />
/// <reference path="../types/slider-captcha-core.d.ts" />

import * as sliderCaptcha from "@slider-captcha/core";

// Fungsi createCaptcha: buat data captcha baru
export async function createCaptcha() {
  const { data, solution } = await sliderCaptcha.create();

  console.log("Processed Captcha Data:", data);
  console.log("Processed Captcha Solution:", solution);

  return { data, solution };
}

// captcha verif
export async function verifyCaptcha(
  solution: string | number,
  responseBody: {
    response: number;
    trail: { x: number[]; y: number[] };
  }
) {
  console.log("solution, responseBody:", solution, responseBody);

  const verification = await sliderCaptcha.verify(
    String(solution),
    responseBody
  );

  // console.log("verification.result:", verification);

  return verification;
}
