window.addEventListener("load", function (ev) {

    window.editor = ace.edit("code");
    window.editor.session.setMode("ace/mode/clojure");
    window.editor.session.setOptions({
        tabSize: 2,
        useSoftTabs: true,
    });
    editor.commands.addCommand({
        name: 'run',
        bindKey: {win: 'Ctrl-Enter',  mac: 'Ctrl-Enter'},
        exec: function(editor) {
            window.doRunCode();
        },
        readOnly: true // false if this command should not apply in readOnly mode
    });

    function doRunCode() {
        let outputEl = document.querySelector('#output');
        let code = window.editor.getValue();
        outputEl.innerHTML = "running...";
        setTimeout(function() {window.run_janet_code(code, outputEl)}, 100);
    }

    function doFormatCode() {
        let userCode = window.editor.getValue();
        let code = "(import ./spork);" + "\n(def usercode ``````````" + userCode + "``````````) (spork/fmt/format-print usercode)";
        let result = window.run_janet_for_output(code);
        const suffix = 'RESULT> nil\n';
        if (!result.endsWith(suffix)) {
            alert("format failed: " + result);
        } else {
            let formattedCode = result.slice(0,-suffix.length);
            window.editor.setValue(formattedCode);
        }
    }

    document.querySelector("#run").addEventListener("click", function (e) {
        doRunCode();
    });

    document.querySelector("#format").addEventListener("click", function (e) {
        doFormatCode();
    });

    window.doRunCode = doRunCode;
});

