// src/tests/auth.test.ts
import prisma from './helpers/prisma'
import app from 'lib/createServer'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('/auth', async () => {
  describe('[POST] /auth/signup', () => {
    it('should respond with a `200` status code and user details', async () => {
      const { status, body } = await request(app).post('/auth/signup').send({
        username: 'aubrey',
        password: '12345gf'
      })

      const newUser = await prisma.user.findFirst()

      expect(status).toBe(200)
      expect(newUser).not.toBeNull()
      expect(body.user).toStrictEqual({
        username: 'aubrey',
        id: newUser?.id
      })
    })
  })
})
