import { renderSVG } from "uqr";

export function QrCode({ value }: { value: string }) {
  const svg = renderSVG(value, {
    ecc: "M",
    border: 2,
    pixelSize: 6,
    whiteColor: "transparent",
    blackColor: "#0c3d4f",
  });

  return (
    <div
      aria-hidden
      className="size-28 shrink-0 sm:size-32 [&_svg]:h-full [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
