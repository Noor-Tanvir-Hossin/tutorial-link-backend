type TUserRolede = {
  user(user: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
  student: 'student';
  tutor: 'tutor';
  admin: 'admin';
};

export const USER_ROLE: TUserRolede = {
  student: 'student',
  tutor: 'tutor',
  admin: 'admin',
} as const;
