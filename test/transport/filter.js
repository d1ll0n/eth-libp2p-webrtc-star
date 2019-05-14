/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)
const multiaddr = require('multiaddr')

module.exports = (create) => {
  describe('filter', () => {
    it('filters non valid webrtc-star multiaddrs', () => {
      const ws = create()

      const maArr = [
        multiaddr('/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo1'),
        multiaddr('/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star'),
        multiaddr('/dnsaddr/libp2p.io/ws/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo1'),
        multiaddr('/dnsaddr/signal.libp2p.io/ws/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo1'),
        multiaddr('/dnsaddr/signal.libp2p.io/wss/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo1'),
        multiaddr('/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo2'),
        multiaddr('/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo3'),
        multiaddr('/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo4'),
        multiaddr('/ip4/127.0.0.1/tcp/9090/ws/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo4'),
        multiaddr('/ip4/127.0.0.1/tcp/9090/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo4'),
        multiaddr('/ip4/127.0.0.1/tcp/9090/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo4' +
          '/p2p-circuit/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo1')
      ]

      const filtered = ws.filter(maArr)
      expect(filtered.length).to.equal(7)
    })

    it('filter a single addr for this transport', () => {
      const ws = create()
      const ma = multiaddr('/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/ipfs/W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Pyo1')

      const filtered = ws.filter(ma)
      expect(filtered.length).to.equal(1)
    })
  })
}
