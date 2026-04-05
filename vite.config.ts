import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import crypto from "crypto";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    {
      name: "local-shop-api",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/api/order" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", async () => {
              try {
                const order = JSON.parse(body);
                const rawIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "Unknown";
                const userAgent = (req.headers["user-agent"] as string) || "Unknown";
                const referer = (req.headers["referer"] as string) || "Direct";
                const cleanIp = rawIp.includes("::ffff:") ? rawIp.split("::ffff:")[1] : (rawIp === "::1" ? "127.0.0.1" : rawIp);
                
                // Simple Geo-IP Lookup
                let country = "Unknown";
                if (cleanIp && cleanIp !== "1" && cleanIp !== "127.0.0.1" && cleanIp !== "Unknown") {
                  try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 2000); // 2s timeout
                    const geoRes = await fetch(`http://ip-api.com/json/${cleanIp}?fields=country`, { signal: controller.signal });
                    clearTimeout(timeout);
                    const geoData: any = await geoRes.json();
                    if (geoData && geoData.country) country = geoData.country;
                  } catch (e) {}
                }

                order.ip = cleanIp;
                order.country = country;
                order.userAgent = userAgent;
                order.referer = referer;
                
                const dataPath = "e:/discord bots/7Flxherberg 1FLMod/data/shop_data.json";
                if (!fs.existsSync(dataPath)) {
                  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
                  fs.writeFileSync(dataPath, JSON.stringify({ transactions: [], promoCodes: [] }));
                }
                const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
                data.transactions.push(order);
                fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
                
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, orderId: order.id }));
              } catch (err: any) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          if (req.url === "/api/register" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", async () => {
              try {
                const { name, email, password } = JSON.parse(body);
                const usersPath = "e:/discord bots/7Flxherberg 1FLMod/data/users.json";
                if (!fs.existsSync(usersPath)) {
                  fs.mkdirSync(path.dirname(usersPath), { recursive: true });
                  fs.writeFileSync(usersPath, JSON.stringify({ users: [] }));
                }
                const data = JSON.parse(fs.readFileSync(usersPath, "utf8"));
                
                if (data.users.find((u: any) => u.email === email)) {
                  res.writeHead(400);
                  res.end(JSON.stringify({ error: "Email already registered" }));
                  return;
                }

                const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
                const newUser = { 
                  id: Math.random().toString(36).substring(2, 9).toUpperCase(),
                  name, 
                  email, 
                  password: hashedPassword,
                  createdAt: new Date().toISOString()
                };
                
                data.users.push(newUser);
                fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));

                // Notify Discord Bot
                try {
                  const shopData = JSON.parse(fs.readFileSync("e:/discord bots/7Flxherberg 1FLMod/data/shop_data.json", "utf8"));
                  shopData.newRegistration = { name, email, id: newUser.id };
                  fs.writeFileSync("e:/discord bots/7Flxherberg 1FLMod/data/shop_data.json", JSON.stringify(shopData, null, 2));
                } catch (e) {}

                // Get noreplyEmail from site.ts
                let noreplyEmail = "noreply@7flxxheberg.com";
                try {
                  const siteContent = fs.readFileSync("src/config/site.ts", "utf8");
                  const match = siteContent.match(/noreplyEmail:\s*["'](.+?)["']/);
                  if (match) noreplyEmail = match[1];
                } catch (e) {}

                // Mock Email Send
                console.log(`[NOREPLY EMAIL] To: ${email} From: ${noreplyEmail} - Welcome to 7Flx Heberg!`);
                
                const { password: _, ...userWithoutPassword } = newUser;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, user: userWithoutPassword }));
              } catch (err: any) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          if (req.url === "/api/login" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", () => {
              try {
                const { email, password } = JSON.parse(body);
                const usersPath = "e:/discord bots/7Flxherberg 1FLMod/data/users.json";
                if (!fs.existsSync(usersPath)) {
                  res.writeHead(400);
                  res.end(JSON.stringify({ error: "No users found" }));
                  return;
                }
                const data = JSON.parse(fs.readFileSync(usersPath, "utf8"));
                const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
                const user = data.users.find((u: any) => u.email === email && u.password === hashedPassword);
                
                if (!user) {
                  res.writeHead(401);
                  res.end(JSON.stringify({ error: "Invalid credentials" }));
                  return;
                }

                const { password: _, ...userWithoutPassword } = user;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, user: userWithoutPassword }));
              } catch (err: any) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }
          if (req.url === "/api/promo" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", () => {
              try {
                const { code } = JSON.parse(body);
                const dataPath = "e:/discord bots/7Flxherberg 1FLMod/data/shop_data.json";
                const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
                const promo = data.promoCodes.find((p: any) => p.code.toUpperCase() === code.toUpperCase());
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ promo: promo || null }));
              } catch (err: any) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }
          next();
        });
      },
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
