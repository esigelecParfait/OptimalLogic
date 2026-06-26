export default function Model2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700,500&f[]=general-sans@400,500,600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
