<script>
    // Form data and error messages returned from the server
    let { form } = $props();
</script>


<div class="min-h-screen bg-[#111827] text-white flex items-center justify-center px-6">

    <!-- Login card -->
    <div class="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-8 shadow-xl">

        <!-- Page title -->
        <h1 class="text-3xl font-bold text-center mb-6">
            Login
        </h1>


        <!-- Display server error messages -->
        {#if form?.error}
            <p class="bg-red-200 border border-red-500 text-red-800 p-3 rounded mb-4">
                {form.error}
            </p>
        {/if}


        <!-- Login form -->
        <form action="?/login" method="POST" class="space-y-4">

            <!-- Username input field -->
            <div>
                <label for="username" class="block mb-1 font-medium">
                    Username
                </label>

                <input
                    type="text"
                    id="username"
                    name="username"
                    autocomplete="username"
                    placeholder="Enter your username"
                    required
                    class="w-full bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
                />
            </div>


            <!-- Password input field -->
            <div>
                <label for="password" class="block mb-1 font-medium">
                    Password
                </label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    autocomplete="current-password"
                    placeholder="Enter your password"
                    required
                    class="w-full bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
                />
            </div>


            <!-- Submit login form -->
            <button
                type="submit"
                class="w-full bg-gradient-to-r from-pink-500 to-violet-500 py-3 rounded-2xl font-bold hover:opacity-90 transition"
            >
                Login
            </button>

        </form>

        </div>

    </div>

