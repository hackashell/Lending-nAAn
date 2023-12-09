import { MetaMaskProvider } from "@metamask/sdk-react";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {" "}
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
            name: "Lending nAAn",
            url: "https://lending.naan.finance",
          },
          extensionOnly: false,
          forceInjectProvider: false,
        }}
      >
        {children}
      </MetaMaskProvider>
    </div>
  );
};
