declare module "@slider-captcha/core" {
  export interface CaptchaData {
    background: Buffer;
    slider: Buffer;
    slide: number;
    width: number;
    height: number;
  }

  export interface CaptchaResult {
    data: CaptchaData;
    solution: string;
  }

  export interface VerificationOptions {
    tolerance?: number;
    verify?: Function;
  }

  export interface VerificationResult {
    result: "success" | "fail";
    token?: string;
  }

  // Tambahkan deklarasi fungsi create
  export function create(): Promise<CaptchaResult>;

  // Fungsi verify sesuai deklarasi sebelumnya
  export function verify(
    solution: string,
    answer: any,
    options?: VerificationOptions
  ): Promise<VerificationResult>;
}
