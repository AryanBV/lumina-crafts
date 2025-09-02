import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Package, MapPin, Settings, Heart, LogOut } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const menuItems = [
    { icon: Package, label: "My Orders", href: "/profile/orders", count: 0 },
    { icon: MapPin, label: "Addresses", href: "/profile/addresses", count: 0 },
    { icon: Heart, label: "Wishlist", href: "/profile/wishlist", count: 0 },
    { icon: Settings, label: "Account Settings", href: "/profile/settings", count: null },
  ];

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="section-padding">
        <h1 className="text-3xl font-serif font-bold text-brown mb-8">My Account</h1>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-nude">
                <div className="w-20 h-20 bg-gradient-to-r from-caramel to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-semibold text-brown">
                  {profile?.full_name || user.email?.split('@')[0]}
                </h2>
                <p className="text-sm text-coffee">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-nude-light transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
                      <span className="text-coffee group-hover:text-brown transition-colors">
                        {item.label}
                      </span>
                    </div>
                    {item.count !== null && (
                      <span className="bg-nude text-coffee text-sm px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Logout */}
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group"
                  >
                    <LogOut className="w-5 h-5 text-coffee group-hover:text-red-500 transition-colors" />
                    <span className="text-coffee group-hover:text-red-500 transition-colors">
                      Sign Out
                    </span>
                  </button>
                </form>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-serif font-bold text-brown mb-6">
                Welcome Back!
              </h2>
              
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-nude to-nude-light rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-caramel mb-2">0</div>
                  <div className="text-coffee">Total Orders</div>
                </div>
                <div className="bg-gradient-to-br from-nude to-nude-light rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-caramel mb-2">0</div>
                  <div className="text-coffee">Wishlist Items</div>
                </div>
                <div className="bg-gradient-to-br from-nude to-nude-light rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-caramel mb-2">₹0</div>
                  <div className="text-coffee">Total Spent</div>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h3 className="text-xl font-semibold text-brown mb-4">Recent Orders</h3>
                <div className="bg-nude-light rounded-xl p-8 text-center">
                  <Package className="w-16 h-16 text-coffee-light mx-auto mb-4" />
                  <p className="text-coffee mb-4">No orders yet</p>
                  <Link
                    href="/products"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all duration-200"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}