import { inject } from '@loopback/core';
import { UserProfile } from '@loopback/security';
import { TokenService } from '@loopback/authentication';
import { HttpErrors, post, requestBody } from '@loopback/rest';
import { MyUserService, TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';

import { RestAPI } from '@/services';

interface FBAuthRequestDto {
  fbToken: string,
  fbID: string
}

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject('services.RestAPI') protected restApi: RestAPI,
  ) { }

  @post('/fb-auth', {
    responses: {
      '200': {
        description: 'Authenticate user with FB Token',
      },
    },
  })

  async fbAuth(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: "object",
            properties: {
              fbToken: { type: 'string', required: [] },
              fbID: { type: 'string', required: [] }
            }
          }
        }
      },
    }) auth: FBAuthRequestDto
  ): Promise<{ token: string }> {
    const fbUserInfo = await this.restApi.getFbAccount(auth.fbToken);
    if (fbUserInfo.id !== auth.fbID) {
      throw new HttpErrors.Unauthorized(`FB token is invalid!`);
    }
    const user = {
      name: fbUserInfo.name,
      email: fbUserInfo.email,
    } as UserProfile;

    const token: string = await this.jwtService.generateToken(user)
    return { token }
  }
}
