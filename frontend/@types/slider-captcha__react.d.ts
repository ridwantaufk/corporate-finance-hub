declare module "@slider-captcha/react" {
  import * as React from "react";

  interface CaptchaData {
    [key: string]: any;
  }

  interface SliderCaptchaProps {
    create: () => Promise<CaptchaData>;
    verify: (response: any, trail?: any) => void | Promise<any>;
    callback?: (token: string) => void;
    text?: {
      anchor?: string;
      challenge?: string;
    };
    variant?: "light" | "dark" | "blue" | "green" | "red";
  }

  const SliderCaptcha: React.FC<SliderCaptchaProps>;

  export default SliderCaptcha;
}
