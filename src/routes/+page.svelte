<script>
    let { data } = $props();
</script>

<div class="min-h-screen bg-white">

    <!-- Navbar -->
    <nav class="flex justify-between items-center px-10 py-5 shadow">

        <h1 class="text-2xl font-bold text-purple-800">
            PDF Management
        </h1>

        <div class="flex gap-5">

            {#if data.user}

                {#if data.user.role === 'admin'}
                    <a href="/admin" class="text-purple-700 font-semibold">
                        Admin
                    </a>
                {:else}
                    <a href="/upload" class="text-purple-700 font-semibold">
                        My PDFs
                    </a>
                {/if}

                <a
                    href="/logout"
                    class="bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </a>

            {:else}

                <a href="/login" class="text-purple-700 font-semibold">
                    Login
                </a>

                <a
                    href="/register"
                    class="bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                    Register
                </a>

            {/if}

        </div>

    </nav>


    <!-- Main Section -->
    <main class="bg-purple-100 py-24 px-10">

        <div class="max-w-5xl mx-auto text-center">

            <p class="text-purple-600 font-semibold mb-4">
                SIMPLE • SECURE • ANYTIME
            </p>

            <h2 class="text-5xl font-bold text-purple-950 mb-5">
                Manage your PDFs easily
            </h2>

            <p class="text-gray-600 text-lg mb-8">
                Upload, manage and download your PDF files in one place.
            </p>


            {#if !data.user}

                <div class="flex justify-center gap-4">

                    <a
                        href="/register"
                        class="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Get Started
                    </a>

                    <a
                        href="/login"
                        class="bg-white text-purple-700 border border-purple-700 px-6 py-3 rounded-lg font-semibold"
                    >
                        Login
                    </a>

                </div>

            {/if}

        </div>

    </main>


    <!-- Features -->
    <section class="py-16 px-10">

        <h2 class="text-3xl font-bold text-purple-900 text-center mb-10">
            What can you do?
        </h2>


        <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

            <div class="bg-purple-50 p-7 rounded-xl text-center">
                <div class="text-4xl mb-3">⬆</div>

                <h3 class="text-xl font-bold text-purple-800">
                    Upload
                </h3>

                <p class="text-gray-600 mt-2">
                    Upload your PDF files easily.
                </p>
            </div>


            <div class="bg-purple-50 p-7 rounded-xl text-center">
                <div class="text-4xl mb-3">📁</div>

                <h3 class="text-xl font-bold text-purple-800">
                    Manage
                </h3>

                <p class="text-gray-600 mt-2">
                    View and manage your PDFs.
                </p>
            </div>


            <div class="bg-purple-50 p-7 rounded-xl text-center">
                <div class="text-4xl mb-3">⬇</div>

                <h3 class="text-xl font-bold text-purple-800">
                    Download
                </h3>

                <p class="text-gray-600 mt-2">
                    Download your PDFs anytime.
                </p>
            </div>

        </div>

    </section>


    <!-- Footer -->
    <footer class="bg-purple-900 text-white text-center py-6">
        PDF Management
    </footer>

</div>