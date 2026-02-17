Feature	Middleware
Send message	verifyToken
Delete message	verifyToken + ownerCheck
Upload image	multer
Admin panel	verifyToken + isAdmin
Login	rateLimiter