const request = require('supertest')
const app = require('./app')

it('GET /users/allusers', async () => {
    const res = await request(app).get('/users/allusers')

    expect(res.statusCode).toBe(200)
    expect(res.body.result).toBe(true)
})

it('GET /users/allusers', async () => {
    const res = await request(app).get('/users/allusers')

    expect(res.statusCode).toBe(200)
    expect(res.body.users).toStrictEqual([{"__v": 0, "_id": "689b2fd7470a24649a9ded50", "banned": 0, "coins": 15, "created": "2025-08-12T12:13:11.804Z", "email": "Paupau@gmail.com", "experience": 600, "friends": ["689b3c8043143c90764f8554"], "group": 0, "level": 1, "password": "$2b$10$CrjlpWyZ9CXfCy0aMz4j9uLF.xIt48gNnMzbjtkaE9XcrL4ryeikC", "request_friends": [], "send_friends": ["689c899d402c3d4f2efd9bbb", "689c8d51402c3d4f2efd9d9d", "689c8dd3402c3d4f2efd9dfc", "689c8e4e402c3d4f2efd9e5d", "689c8eeb402c3d4f2efd9f20", "689c8ef1402c3d4f2efd9f38", "689c94e3933c4afc4ec3c185"], "settings": {"sound_effect": 0, "sound_music": 0}, "skin_use": "cat", "skins": ["basic", "cat"], "stats": {"game": 19, "lose": 18, "win": 1}, "token": "gdn-Vb7ZKMsfh7vT_K-bij_m7RzrHVzA", "username": "Paupau", "vip": 0}, {"__v": 0, "_id": "689b3c8043143c90764f8554", "banned": 0, "coins": 0, "created": "2025-08-12T13:07:12.066Z", "email": "tata@tata.fr", "experience": 0, "friends": ["689b2fd7470a24649a9ded50"], "group": 0, "level": 1, "password": "$2b$10$DKxoySu8tAjKROSNDFo9A.6wWsmZ2Lb4rxig4vCGqAzieeHc9z08u", "request_friends": [], "send_friends": [], "settings": {"sound_effect": 0, "sound_music": 0}, "skin_use": "basic", "skins": ["basic", "cat"], "stats": {"game": 0, "lose": 0, "win": 0}, "token": "zFAQHUZpOsYLBYkdCRLvDsaRkbJ4q9Qk", "username": "tata", "vip": 0}, {"__v": 0, "_id": "689c7b4e706e7b05e77f443b", "banned": 0, "coins": 0, "created": "2025-08-13T11:47:26.683Z", "email": "aaa@gmail.com", "experience": 0, "friends": [], "group": 0, "level": 1, "password": "$2b$10$McpU0NLp0O0dJZ0ZY5pgQebYceLPYIxQMaaT89GeT1V8Zt77QIAeW", "request_friends": [], "send_friends": [], "settings": {"sound_effect": 0, "sound_music": 0}, "skin_use": "basic", "skins": ["basic", "cat"], "stats": {"game": 3, "lose": 3, "win": 0}, "token": "n1vdrDDCR0WDl4RMr2FJmfcMVZWCgh4I", "username": "aaa", "vip": 0}])
})