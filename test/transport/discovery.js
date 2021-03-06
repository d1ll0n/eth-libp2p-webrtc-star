/* eslint-env mocha */

'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)
const multiaddr = require('multiaddr')

module.exports = (create) => {
  describe('peer discovery', () => {
    let ws1
    const base = (id) => {
      return `/ip4/127.0.0.1/tcp/15555/ws/p2p-webrtc-star/ipfs/${id}`
    }
    const ma1 = multiaddr(base('W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Py3A'))

    let ws2
    const ma2 = multiaddr(base('W1p3KrTSzJXH3ujnGvNsYSP5bNvoUrfbmWfZDUnLH7Py3B'))

    it('listen on the first', (done) => {
      ws1 = create()

      const listener = ws1.createListener((conn) => {})
      listener.listen(ma1, (err) => {
        expect(err).to.not.exist()
        done()
      })
    })

    it('listen on the second, discover the first', (done) => {
      ws2 = create()

      ws1.discovery.once('peer', (peerInfo) => {
        expect(peerInfo.multiaddrs.has(ma2)).to.equal(true)
        done()
      })

      const listener = ws2.createListener((conn) => {})
      listener.listen(ma2, (err) => {
        expect(err).to.not.exist()
      })
    })
  })
}
