

const NetworkContent = () => `
source /etc/network/interfaces.d/*
# Network is managed by Network manager
auto lo
iface lo inet loopback


auto end0
iface end0 inet static
address 192.168.1.2
gateway 192.168.1.1
netmask 255.255.255.0
`;

export default NetworkContent;

